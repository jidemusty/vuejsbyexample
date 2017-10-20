let bus = new Vue();

let Task = {
    props: ['task'],
    template: `
        <div class="task" :class="{ 'task--done': task.done }">
            {{ task.body }}
            <a href="#" @click.prevent="toggleDone(task.id)">mark as {{ task.done ? 'not done' : 'done' }}</a>
            <a href="#" @click.prevent="deleteTask(task.id)">delete</a>
        </div>
    `,
    methods: {
        toggleDone (taskId) {
            bus.$emit('task:toggleDone', taskId)
        },
        deleteTask (taskId) {
            bus.$emit('task:delete', taskId)
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
    },
    methods: {
        toggleDone (taskId) {
            this.tasks = this.tasks.map((task) => {
                if (task.id === taskId) {
                    task.done = !task.done
                }

                return task                                
            });
        },
        deleteTask (taskId) {
            this.tasks = this.tasks.filter((task) => {
                return task.id !== taskId
            });
        }
    },
    mounted () {
        bus.$on('task:toggleDone', (taskId) => {
            this.toggleDone(taskId)
        });

        bus.$on('task:delete', (taskId) => {
            this.deleteTask(taskId)
        });
    }
}

let app = new Vue({
    el: '#app',
    components: {
        'tasks': Tasks
    }
})