<template>
    <div class="create-order-container">
        <h1>Create Order</h1>
        <form @submit.prevent="submitOrder">
            <input v-model="newOrder.orderNumber" placeholder="Order Number" class="input-style"/>

            <table class="product-selection-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Add</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="product in avaliableProducts" :key="product.id">
                        <td>{{ product.name }}</td>
                        <td>{{ product.price }}</td>
                        <td>
                            <input type="number" v-model="product.quantity" min="0" placeholder="Quantity" class="input-style"/>
                        </td>
                        <td>
                            <button class="btn-small" @click="addProduct(product)" :disabled="isProductAdded(product)">Add</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h2>Seelected Products:</h2>
            <ul>
                <li v-for="(item, index) in newOrder.products" :key="index">
                    {{ item.name }} - Quantity: {{ item.quantity }} - Total: {{ item.total }}
                    <button class="btn-small btn-danger" @click="removeProduct(index)">Remove</button>
                </li>
            </ul>
            <p>Total: $ {{ newOrder.total }}</p>

            <button type="submit" class="btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
import { db } from '../firebaseConfig'
import { collection, getDocs, addDoc } from 'firebase/firestore'

export default {
    
    data() {
        return {
            newOrder: {
                orderNumber: '',
                products: [],
                total: 0
            },
            avaliableProducts: []
        }
    },
    async created() {
        await this.getProducts()
    },
    methods: {
        async getProducts() {
            const querySnapshot = await getDocs(collection(db, 'products'))
            this.avaliableProducts = querySnapshot.docs.map(doc => ({
                id: doc.id, quantity: 0, ...doc.data() 
            }))
                
        },
        addProduct(product) {
            if (product.quantity <= 0) {
                alert('Quantity must be greater than 0')
                return
            }
            const total = product.price * product.quantity

            const productToAdd = {
                ...product,
                total
            }

            this.newOrder.products.push(productToAdd)
            this.calculateTotal()
        },
        calculateTotal() {
            this.newOrder.total = this.newOrder.products.reduce((acc, item) => acc + item.total, 0)
        },
        removeProduct(index) {
            this.newOrder.products.splice(index, 1)
            this.calculateTotal()
        },
        async submitOrder() {
            if(this.newOrder.products.length === 0) {
                alert('Please select at least one product')
                return
            }
            await addDoc(collection(db, 'orders'), this.newOrder)
            alert('Order created successfully')
            this.resetForm()
        },
        isProductAdded(product) {
            return this.newOrder.products.some(item => item.id === product.id)
        },
        resetForm() {
            this.newOrder = {
                orderNumber: '',
                products: [],
                total: 0
            }
        }
    }
}
</script>