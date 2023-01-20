// DESAFIO 2 
// Barreiro Federico

import fs from "fs";
import { v4 as uuidv4 } from 'uuid';



export default class ProductManager {

	constructor() {

	this.path = "./products.json"

	}
	

	async addProduct(title,description,price,thumbnail,code,stock) {
		try{
		
		const products = await this.getProducts();
		
		

		const product = {
			id : uuidv4(),
			title,
			description,
			price,
			thumbnail,
			code,
			stock
		}
		
		const productFilt = products.filter(product=> product.code == code)
		
		if(productFilt.length == 0) {
			
			
			products.push(product)
			
			await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
			const creado = `Added product with id: ${product.id}`;
			return creado;
		}
		else {
			
			const noCreado = "Error. The code must be unique. Please try again";
			return noCreado;
		}
	} catch (error) {
		error;
	}

		}
		async getProducts() {
			try {
				if(fs.existsSync(this.path)) {
					console.log("Se encontró data en el json")
					const data = await fs.promises.readFile(this.path,"utf-8")
					
					const products = JSON.parse(data);
					return products;
				} else {
					console.log("El JSON esta vacio")
					const products = []
					return products;
				}
			} catch(error) {
				error;
			}
			
	}

	async getProductsById(productId) {
		try{
			const products = await this.getProducts();

		const productFilt = products.filter(product=> product.id == productId)

		if(productFilt.length == 0) {
			return `Not found`
		}
		else {
			return productFilt
		} }

		catch(error) {
			error;
		}
}

async deleteProduct(productId) {
	try{
		const products = await this.getProducts();

	const productFilt = products.filter(product=> product.id == productId)
		
	if(productFilt.length == 0) {
		return `Not found`;
	}
	else {
		const productsFiltered = products.filter(product=> product.id !== productId);
		
		const nuevoProducts = await fs.promises.writeFile(this.path, JSON.stringify(productsFiltered, null, "\t"));
		
			return `Deleted product with id: ${productId}`;
		
	} }

	catch(error) {
		error;
	}
}
async updateProduct(productId, obj) {
	try{
	const products = await this.getProducts();
	
	const productsfiltered = products.filter(product=> product.id !== productId)
	const productFilt = products.filter(product=> product.id == productId)
	
	if(productFilt.length == 0) {
		return `We could not find a product with this ID`;
	}
	else {
		const campoaModificar = Object.keys(obj)[0];
		
		const valoraModificar = Object.values(obj)[0];
		console.log(valoraModificar)

		productFilt[0][campoaModificar] = valoraModificar;
		
	productsfiltered.push(productFilt[0]);	

	await fs.promises.writeFile(this.path, JSON.stringify(productsfiltered, null, "\t"));
		return `Modify product with id: ${productId}`;
	}
	}
	catch(error) {
		error;
	}
} 
}


//const prod1 = new ProductManager();


 const agarrarProductos = async() => {
	try  {
	const prods = await prod1.getProducts();
	console.log(prods); }
	catch(error) {
		error
	}
}
//agarrarProductos(); 


let title1 = "producto prueba";
let description1 = "Este es un producto prueba";
let price1 = 1000;
let thumbnail1 = "Sin imagen";
let code1 = "abd195";
let stock1 = 4; 

const agregarProductos = async(title,description,price,thumbnail,code,stock) => {
	try  {
	const prods = await prod1.addProduct(title,description,price,thumbnail,code,stock);
	console.log(prods); }
	catch(error) {
		error
	}
}

//console.log(agregarProductos(title1,description1,price1,thumbnail1,code1,stock1));


// console.log(agarrarProductos());



const agarrarProductosPorId = async(id) => {
	try  {
	const prods = await prod1.getProductsById(id);
	console.log(prods); }
	catch(error) {
		error
	}
}

//agarrarProductosPorId("59c8be5f-f23b-4b41-8eef-be6d4a9f2539");


const borrarProducto = async(id) => {
	try  {
	const prods = await prod1.deleteProduct(id);
	console.log(prods); }
	catch(error) {
		error
	}
}

//console.log(borrarProducto("d4270ed6-636d-406b-a62f-4e98c948395d"));



const actualizarProducto = async(id, obj) => {
	try  {
	const prods = await prod1.updateProduct(id,obj);
	console.log(prods); }
	catch(error) {
		error
	}
}
const prueba1 = {price: 1111};
//actualizarProducto("d4270ed6-636d-406b-a62f-4e98c948395d",prueba1);

