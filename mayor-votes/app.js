let Mayor = {
    template: `
        <div>
            <h3>Mayor of Lagos</h3>

            <ul>
                <li v-for="candidate in candidates" :key="candidate.name">
                    {{ candidate.name }} - {{ candidate.votes }}
                    <button @click="candidate.votes++">vote</button>
                </li>
            </ul>

            <button @click="clear">clear votes</button>

            <div>
                winner is <strong>{{ winner.name }}</strong> with <strong>{{ winner.votes }}</strong> votes
            </div>
        </div>
    `,
    data () {
        return {
            candidates: [
                { name: "Mr. Black", votes: 140 },
                { name: "Mr. White", votes: 135 },
                { name: "Mr. Pink", votes: 145 },
                { name: "Mr. Brown", votes: 130 },
            ]
        }
    },
    methods: {
        clear () {
            this.candidates = this.candidates.map((candidate) => {
                candidate.votes = 0
                return candidate
            })
        }
    },
    computed: {
        winner () {
            let mayor = this.candidates.sort((a, b) => {
                return b.votes - a.votes
            })

            return mayor[0]
        }
    }
}

let app = new Vue({
    el: '#app',
    components: {
        'mayor': Mayor
    }
})