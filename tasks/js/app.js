let Task = {
    props: ['task'],
    template: `
        <div class="task" :class="{ 'task--done': task.done }">
            {{ task.body }}
            <a href="#" @click.prevent="toggleDone">mark as {{ task.done ? 'not done' : 'done' }}</a>
        </div>
    `,
    methods: {
        toggleDone () {
            this.task.done = !this.task.done
        }
    }
}

let Tasks = {
    data () {
        return {
            tasks: [
                { id: 1, body: 'Task One', done: false },
                { id: 2, body: 'Task Two', done: true }
            ]
        }
    },
    template: `
        <div>
            <template v-if="tasks.length">
                <div class="tasks">
                    <task v-for="task in tasks" :key="task.id" :task="task"></task>
                </div>
            </template>
            <span v-else>No Task</span>
        </div>
    `,
    components: {
        'task': Task
    }
}

let app = new Vue({
    el: '#app',
    components: {
        'tasks': Tasks
    }
})