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

            {{ query }}
            <table v-if="people.length">
                <thead>
                    <th><td>ID</td></th>
                    <th><td>Name</td></th>
                    <th><td>Username<td></th>
                    <th><td>Email</td></th>
                </thead>
                <tbody>
                    <tr v-for="person in people">
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