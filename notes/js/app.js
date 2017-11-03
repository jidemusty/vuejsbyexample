let Note = {
    props: [
        'noteObject'
    ],
    data () {
        return {
            open: false,
            note: this.noteObject
        }
    },
    template: `
        <div class="note__wrapper">
            <div class="note__header">
                <a href=# class="note">
                    <span>{{ note.body || 'Empty Note' }}</span>
                    <span>5 words</span>
                </a>
                <a v-if="open" href="#" class="note__delete">Delete note</a>
            </div>
            <textarea v-if="open" class="editor" rows="10" placeholder="Write a note"></textarea>
        </div>
    `
}

let Notes = {
    components: {
        'note': Note
    },
    data () {
        return {
            notes: JSON.parse(localStorage.getItem('notes')) || []
        }
    },
    template: `
        <div class="notes">
            <a class="notes__new" href="#" @click.prevent="addNote">
                Create a new note
            </a>
            <note v-for="note in notes" :note-object="note" :key="note.id"></note>
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
