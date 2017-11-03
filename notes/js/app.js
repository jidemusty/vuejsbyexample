let Notes = {
    data () {
        return {
            notes: []
        }
    },
    template: `
        <div class="notes">
            <a class="notes__new" href="#" @click.prevent="addNote">
                Create a new note
            </a>
        </div>
    `,
    methods: {
        addNote () {
            this.notes.unshift({
                id: Date.now(),
                body: ''
            })

            localStorage.setItem('notes', JSON.stringify(this.notes));
        }
    }
}

let app = new Vue({
    el: "#app",
    components: {
        'notes': Notes
    }
})