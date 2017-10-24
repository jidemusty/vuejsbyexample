let Results = {
    props: ["answeredQuestions"],
    template: `
        <div class="results">
            <h2>Results</h2>
            <p>You got {{ correctAnswerCount() }} out of {{ answeredQuestions.length }} questions correct</p>

            <div class="results__item" v-for="answered in answeredQuestions">
                <h3>{{ answered.question.title }}</h3>
                <p>
                    Your answer:
                    <span
                        :class="{
                            'danger': !answered.answer.correct,
                            'success': answered.answer.correct
                        }"
                    >{{ answered.answer.title }}
                    </span>
                </p>
                <p v-if="!answered.answer.correct">
                    Correct Answer: {{ getCorrectAnswers(answered.question).title }}
                </p>
            </div>
        </div>

    `,
    methods: {
        getCorrectAnswers (question) {
            return question.answers.find((answer) => {
                return answer.correct === true;
            })
        },
        correctAnswerCount () {
            return this.answeredQuestions.filter((answered) => {
                return answered.answer.correct === true;
            }).length
        }
    }
}

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
            this.showNext = true
            this.answerChosen = answer
        },
        nextQuestion () {
            this.$emit('question:answered', this.question, this.answerChosen)
        }
    }
}

let Quiz = {
    components: {
        'question': Question,
        'results': Results
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
                <results :answered-questions="answeredQuestions"></results>
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