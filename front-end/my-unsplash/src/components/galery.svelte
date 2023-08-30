
<script>
  import { inView } from "motion";
  import { onMount } from "svelte";
  import { user } from "../lib/stores";

    export let pictures;

    let loadMoreIndicator;
    let lastPageLoaded= 1;
    let fetchedPosts= [];

    $: postPages= [...pictures.posts, ...fetchedPosts];
   
    const loadMore= async() =>{
        const page= lastPageLoaded + 1;
        if(page <= pictures.totalPages){
            const newData= await fetch(`http://localhost:4000/api/post/allPosts?page=${page}`, {
                headers: new Headers({ Accept: 'application/json' })
            }).then((res) => res.json());

            lastPageLoaded= page;
            fetchedPosts= [...fetchedPosts, ...newData.posts];

            inView('.posts-container > div:last-child', () =>{
                loadMore();
            });
        }
    }


    onMount(() =>{
        inView('.posts-container > div:last-child', () =>{
            loadMore();
        });
    });


    //https://res.cloudinary.com/dxeuxy7ik/image/upload/v1693159026/zmxtbxkg0kx2cmzsk0rn.jpg
    // https://res.cloudinary.com/demo/image/upload/fl_attachment:my_custom_filename/sample.jpg

</script>

{#if pictures}
    <div class="posts-container">
         {#each postPages as { img, user }}
                <div class="card-image">
                    <img src="{img}" alt="" id="image">
                    <div class="overlay"></div>
                    <div class="actions">
                        <div class="user-info">
                            {#if user != null}
                                <a href="/profile/{user.username}">
                                    <img id="profile-img" src="{user.profileImg}" alt="profile picture of {user.username}">
                                </a>
                                <a href="/profile/{user.username}">{user.username}</a>
                            {/if}
                        </div>
                        <a href="{img}" download>
                            <img src="download.svg" alt="download icon">
                        </a>
                    </div>
                </div>    
        {/each} 
        <!-- Arreglar -->
        {#await loadMore}
            <h1 style="font-size: 20px; color: red;">Cargando mas contenido</h1>
        {/await}
    </div>
{/if}


<style lang="scss">


    a{
        color: white;  
    }

    .posts-container{
        padding-top: 100px;
        width: 100%;
        margin: 0 auto;
        display: grid;
        grid-auto-flow: dense;
        grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
        grid-gap: 25px;
        grid-template-rows: masonry;

        padding-left: 20px;
        padding-right: 20px;

        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }


    .card-image{
        position: relative;
    }

    .overlay{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0);
        transition: background 0.5 ease;
    }

    .card-image:hover .overlay{
        display: block;
        background: rgba(0, 0, 0, .3);
    }

    .actions{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        opacity: 0;
        transition: opacity 0.35s ease;
        position: absolute;
        bottom: 0;
        width: 100%;  


    }

    .card-image:hover .actions{
        opacity: 1;
    }

    .actions a{
        z-index: 1;
    }


    #profile-img, svg{
        width: 32px;
        height: 32px;
        border-radius: 50%;
    }

    .user-info{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;

        p{
            font-size: 15px;
            color: white;
        }
    }

   
</style>
