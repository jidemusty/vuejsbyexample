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

let TaskForm = {
    data () {
        return {
            body: null
        }
    },
    template: `
        <form action="#" @submit.prevent="addTask">
            <input type="text" v-model.trim="body" />
            <button>add task</button>
        </form>
    `,
    methods: {
        addTask () {
            if (!this.body) {
                return
            }

            bus.$emit('task:added', {
                id: Date.now(),
                body: this.body,
                done: false
            })

            this.body = null
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
            <div class="tasks">
                <template v-if="tasks.length">
                    <task v-for="task in tasks" :key="task.id" :task="task"></task>
                </template>
                <span v-else>No Task</span>
            </div>
            <task-form></task-form>
        </div>
    `,
    components: {
        'task': Task,
        'task-form': TaskForm
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

        bus.$on('task:added', (task) => {
            this.tasks.unshift(task);
        });
    }
}

let app = new Vue({
    el: '#app',
    components: {
        'tasks': Tasks
    }
})