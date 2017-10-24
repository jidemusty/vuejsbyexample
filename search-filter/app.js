let Search = {
    data () {
        return {
            query: ''
        }
    },
    template: `
        <input type="search" v-model="query" @input="changed">
    `,
    methods: {
        changed () {
            this.$emit('input', this.query)
        }
    }
}

let People = {
    components: {
        'search': Search
    },
    data () {
        return {
            people: [],
            query: ''
        }
    },
    template: `
        <div class="people">

            <search v-model="query"></search>

            <table v-if="people.length">
                <thead>
                    <th><td>ID</td></th>
                    <th><td>Name</td></th>
                    <th><td>Username<td></th>
                    <th><td>Email</td></th>
                </thead>
                <tbody>
                    <tr v-for="person in filteredPeople">
                        <td>{{ person.id }}</td>
                        <td>{{ person.name }}</td>
                        <td>{{ person.username }}</td>
                        <td>{{ person.email }}</td>
                    </tr>
                </tbody>
            </table>
            <p v-else>No People</p>
        </div>
    `,
    computed: {
        filteredPeople () {
            return this.people.filter((row) => {
                return Object.keys(row).some((key) => {
                    return String(row[key]).indexOf(this.query) > -1
                })
            })
        }
    },
    mounted () {
        axios.get('people.json')
            .then((response) => {
                this.people = response.data
            })
    }
}

let app = new Vue({
    el: '#app',
    components: {
        'people': People
    }
})