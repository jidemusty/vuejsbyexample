let Answer = {
    props: ['answer'],
    template: `

    `,
}

let Question = {
    props: ['question'],
    template: `
        <h2>Question</h2>
        <p>{{ question.title }}</p>
    `,
    components: {
        'answer': Answer
    }
}

let Quiz = {
    data () {
        return {
            questions: [],
            currentQuestion: null
        }
    },
    template: `
        <question :question="currentQuestion"></question>
    `,
    components: {
        'question': Question
    }
}

let app = new Vue({
    el: '#app',
    components: {
        'quiz': Quiz
    },
    mounted () {
        axios.get('questions.json')
            .then((response) => {
                this.questions = response.data
                this.currentQuestion = this.questions[0]
            })
            .catch((err) => console.log(err))
    }
})