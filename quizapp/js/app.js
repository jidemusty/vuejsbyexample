let Answer = {
    props: ['answer'],
    template: `
        <div class="answer">
            <label :for="'answer-' + answer.id">
                <input
                    type="radio"
                    name="answer"
                    :id="'answer-' + answer.id"
                    @click="choose(answer)"
                /> {{ answer.title }}
            </label>
        </div>
    `,
    methods: {
        choose (answer) {
            this.$emit('answer:chosen', answer)
        }
    }
}

let Question = {
    data () {
        return {
            showNext: false,
            answerChosen: null
        }
    },
    components: {
        'answer': Answer
    },
    props: ['question'],
    template: `
        <div class="question">
            <h3>{{ question.title }}</h3>
            <answer 
                v-for="answer in question.answers"
                :answer="answer"
                :key="answer.id"
                v-on:answer:chosen="answerClicked"
            ></answer>

            <button v-if="showNext" @click.prevent="nextQuestion">next</button>
        </div>
    `,
    methods: {
        answerClicked (answer) {
            this.showNext = true;
            this.answerChosen = answer;   
        },
        nextQuestion () {
            this.$emit('question:answered', this.question, this.answerChosen)
        }
    }
}

let Quiz = {
    components: {
        'question': Question
    },
    data () {
        return {
            questions: [],
            currentQuestion: null,
            answeredQuestions: [],
            currentQuestionNumber: 1,
            showResults: false
        }
    },
    mounted () {
        axios.get('questions.json')
            .then((response) => {
                this.questions = response.data
                this.currentQuestion = this.questions[0]
            })
    },
    template: `
        <div class="quiz">
            <template v-if="showResults">
                Show Results
            </template>
            <template v-else>
                <h4>Question {{ currentQuestionNumber }} of {{ questions.length }}</h4>
                <question
                    v-if="currentQuestion"
                    :question="currentQuestion"
                    v-on:question:answered="answered"
                ></question>
            </template>
        </div>
    `,
    methods: {
        answered (question, answer) {
            this.storeAnswer(question, answer)
            this.setNextQuestion()
        },
        storeAnswer (question, answer) {
            this.answeredQuestions.push({
                question: question,
                answer: answer
            })
        },
        setNextQuestion () {
            if (this.allQuestionsAnswered()) {
                this.showResults = true
                return
            }

            this.currentQuestionNumber++
            this.currentQuestion = this.questions[this.currentQuestionNumber - 1]
        },
        allQuestionsAnswered () {
            return this.currentQuestionNumber === this.questions.length
        }
    }
}

let app = new Vue({
    el: '#app',
    components: {
        'quiz': Quiz
    }
})