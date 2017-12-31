let Choice = {
    template: `
        <div>
            <div>
                <input type="radio" value="$5" v-model="choice" @change="display"> Billed monthly
                <input type="radio" value="$50" v-model="choice" @change="display"> Billed yearly (save 17%)
            </div>

            <div>
                {{ text }}
            </div>
        </div>
    `,
    data () {
        return {
            choice: null,
            text: ''
        }
    },
    methods: {
        display () {
            if (this.choice === "$5") {
                this.text = "Upgrade to become a member. $5/month, cancel anytime."
            } else {
                this.text = "Upgrade to become a member. ;$50/year. That’s $10 off."
            }
        }
    }
}

let app = new Vue({
    el: '#app',
    components: {
        'choice': Choice
    }
})