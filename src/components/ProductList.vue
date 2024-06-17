<template>
    <div class="product-list-container">
        <h1>Product List</h1>

        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td>{{ product.name }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.description }}</td>
                    <td>
                        <button class="btn-small" @click="editProduct(product.id)">Edit</button>
                        <button class="btn-small btn-danger" @click="deleteProduct(product.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button @click="showAddProduct = true">Add Product</button>

        <div v-if="showAddProduct || selectedProduct" class="product-form">
            <h2>Add Product</h2>
            <input v-model="productForm.name" placeholder="Name">
            <input v-model="productForm.price" placeholder="Price">
            <textarea v-model="productForm.description" placeholder="Description"></textarea>

            <button @click="submitProduct">Save</button>
            <button @click="cancel">Cancel</button>
        </div>
    </div>
</template>

<script>
import { db } from '../firebaseConfig'
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore'

export default {
    data() {
        return {
            products: [],
            showAddProduct: false,
            selectedProduct: null,
            productForm: {
                name: '',
                price: 0,
                description: '',
            }
        }
    },
    async created() {
        await this.getProducts()
    },
    methods: {
        async getProducts() {
            const querySnapshot = await getDocs(collection(db, 'products'))
            this.products = querySnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .sort((a, b) => a.name.localeCompare(b.name))

        },
        editProduct(id) {
            const product = this.products.find(product => product.id === id)
            this.productForm = { ...product }
            this.selectedProduct = id
            this.showAddProduct = true
        },
        async deleteProduct(id) {
            await deleteDoc(doc(db, 'products', id))
            await this.getProducts()
        },
        async submitProduct() {
            if (this.selectedProduct) {
                await updateDoc(doc(db, 'products', this.selectedProduct), this.productForm)
            } else {
                await addDoc(collection(db, 'products'), this.productForm)
            }
            await this.getProducts()
            this.cancel()
        },
        cancel() {
            this.productForm = {
                name: '',
                price: 0,
                description: '',
            }
            this.selectedProduct = null
            this.showAddProduct = false
        }
    }
}
</script>