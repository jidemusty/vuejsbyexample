let Answer = {
    props: ['answer'],
    template: `
        <div class="answer">
            <label :for="'answer-' + answer.id">
                <input type="radio" name="answer" :id="'answer-' + answer.id" /> {{ answer.title }}
            </label>
        </div>
    `
}

let Question = {
    components: {
        'answer': Answer
    },
    props: ['question'],
    template: `
        <div class="question">
            <h3>{{ question.title }}</h3>
            <answer v-for="answer in question.answers" :answer="answer" :key="answer.id"></answer>
        </div>
    `
}

let Quiz = {
    components: {
        'question': Question
    },
    data () {
        return {
            questions: [],
            currentQuestion: null
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
            <question v-if="currentQuestion" :question="currentQuestion"></question>
        </div>
    `
}

let app = new Vue({
    el: '#app',
    components: {
        'quiz': Quiz
    }
})