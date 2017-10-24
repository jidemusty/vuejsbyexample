let People = {
    data () {
        return {
            people: []
        }
    },
    template: `
        <div class="people">
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