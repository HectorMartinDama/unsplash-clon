export async function getCategoriesNames(){
    return await fetch(`http://localhost:4000/api/category/categoriesNames`)
        .then(res => res.json());
}