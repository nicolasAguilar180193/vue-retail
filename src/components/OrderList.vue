<template>
    <div class="order-list-container">
        <h1>Order List</h1>
        <table>
            <thead>
                <tr>
                    <th>Order number</th>
                    <th>Total</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order.id">
                    <td>{{ order.orderNumber }}</td>
                    <td>$ {{ order.total }}</td>
                    <td>
                        <button class="btn-small" @click="editOrder(order.id)">Edit</button>
                        <button class="btn-small btn-danger" @click="deleteOrder(order.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <router-link to="/create-order" class="add-order-link">Add New Order</router-link>
    </div>
</template>

<script>
    import { db } from '../firebaseConfig'
    import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'

    export default {
        data() {
            return {
                orders: []
            }
        },
        async created() {
            await this.getOrders()
        },

        methods: {
            async getOrders() {
                const querySnapshot = await getDocs(collection(db, 'orders'))
                this.orders = querySnapshot.docs
                    .map(doc => ({ id: doc.id, ...doc.data() }))
                    .sort((a, b) => a.order_number - b.order_number)
            },
            editOrder(id) {
                console.log(id)
            },
            async deleteOrder(id) {
                await deleteDoc(doc(db, 'orders', id))
                await this.getOrders()
            },
        }
    }
</script>