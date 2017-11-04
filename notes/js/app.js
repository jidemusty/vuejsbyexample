let Editor = {
    props:[
        'noteObject'
    ],
    data () {
        return {
            note: this.noteObject
        }
    },
    template:`
        <textarea 
            class="editor" 
            rows="10" 
            placeholder="Write a note" 
            v-model="note.body"
            @input="update"
            >
        </textarea>
    `,
    methods: {
        update () {
            this.$emit('update')
        }
    }
}

let Note = {
    components: {
        'editor': Editor
    },
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
                <a href=# class="note" @click.prevent="open = !open">
                    <span>{{ note.body || 'Empty Note' }}</span>
                    <span>5 words</span>
                </a>
                <a v-if="open" href="#" class="note__delete">Delete note</a>
            </div>
            <editor v-if="open" :note-object="note" v-on:update="saveNote"></editor>
        </div>
    `,
    methods: {
        saveNote () {
            let notes = JSON.parse(localStorage.getItem('notes')) || [];

            notes.map((note) => {
                if (note.id === this.note.id) {
                    note.body = this.note.body
                }
            })

            localStorage.setItem('notes', JSON.stringify(notes));
        }
    }
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
