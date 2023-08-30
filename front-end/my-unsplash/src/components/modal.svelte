

<script>

    //https://css-tricks.com/lazy-loading-images-in-svelte/

    import { onDestroy, onMount } from "svelte";
    import { user, isLoggedIn } from "../lib/stores";
    import { get } from "svelte/store";
  import { getCategoriesNames } from "../servicies/categoryService";
    
    let modal;
    let previewImage;
    let categoriesNames;
    let title; let categorySelected; let files; // Valores del formulario

    async function fileToBase64(file){
        return new Promise(resolve =>{
            const reader= new FileReader();
            reader.onload= () =>{
                resolve(reader.result);
            }
            reader.readAsDataURL(file);
        });
    }


    function example(event){
        event.preventDefault();
        files= event.dataTransfer.files;
    }

    function toggleActive(ev){
        ev.preventDefault();
        ev.stopPropagation();
    }

    const onChange= (e) =>{
        const image = (e.target)?.files?.[0];
        if (!image) return;
        previewImage = URL.createObjectURL(image);
    }

    onMount(async () =>{
        modal= document.querySelector('dialog');
        categoriesNames= await getCategoriesNames();
    });


    const closeModal= ()=>{
        modal.close();
        files= undefined;
        previewImage= null;
    }

    const post= async() =>{
        if(!files) return;
        const fileTo64= await fileToBase64(files[0]);

        const response= await fetch('http://localhost:4000/api/post/createPost', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ user: $user.email, labels: 'bosque', img: fileTo64, category: categorySelected})
        });
        return await response.json();
        
            //let datos= new FormData();
            //datos.append('labels', title);
            //datos.append('image', files[0]);
            //datos.append('user', $user.email);
            
            // for (let i = 0; i < files.length; i++) {
            //      datos.append('files', files[i],  `${crypto.randomUUID()}`)
            // }

        }
</script>


<dialog data-dialog>
    <p>Send to My Unsplash</p>
    <form on:submit={post} enctype="multipart/form-data">
        {#if !files}
            <div class="drag-and-drop" on:change={onChange} on:dragenter|preventDefault={toggleActive} on:dragleave|preventDefault={toggleActive} on:dragover|preventDefault={toggleActive} on:drop={event => example(event)}>
                <h3>Arrastra y Suelta imagenes o navega para elegir un archivo</h3>
                <img src="load-files.png" alt="">
            </div>
            <input type="file" accept="image/*" name="image" id="upload" on:change={onChange} bind:files hidden>
            <label for="upload">Choose file</label>
        {/if}

        {#if files}
            {#each files as file}
                <div class="card">
                    <img src="{previewImage}" alt="Preview" />
                    <input type="text" name="labels" bind:value={title} placeholder="Add labels">
                    <select name="category" bind:value={categorySelected}>
                        {#each categoriesNames as { name } }
                            <option value="{name}">{name}</option>
                        {/each}
                    </select>
                </div>
            {/each}
        {/if}
        
        <footer>
            <button on:click={closeModal}>Cancel</button>
            {#if files}
                <button>Send {files.length} photo</button>
            {:else}
                <button disabled='{!files}'>Send to MyUnsplash</button>
            {/if}
        </footer>
    </form>
</dialog>



<button disabled={!$isLoggedIn} on:click={() => modal.showModal()}>Add photo</button>

<style lang="scss">
     dialog{
        width: 80%;
        height: 80%;
        border: none;
        border-radius: 10px;
    }

    .card{
        display: flex;
        flex-direction: column;
        width: 150px;
    }

    footer{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
        height: 50px;
        bottom: 0;
        position: absolute;
        border-top: 1px solid #D1D1D1;

        button{
            border-radius: 4px;
            //margin-right: 8px;
            height: 32px;
        }
    }

    .drag-and-drop{
        border: 2px dashed grey;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img{
            pointer-events: none;
        }
    }
</style>