
<script>
    export let data;
    import { user } from '../../../lib/stores';
    import Nav from '../../../components/nav.svelte';
    import Galery from '../../../components/galery.svelte';


    const infoUser= data.infoUser;

    console.log(infoUser)
</script>


<Nav></Nav>



<section>
    {#if infoUser}
        <img src="{infoUser.profileImg}" alt="profile image of the user {infoUser.username}" loading="lazy">
        <div>
            <h1>{infoUser.username}</h1>
            <p>Descarga bellas fotos gratuitas de alta <br/> calidad seleccionadas por {infoUser.username}</p>
        </div>
    {/if}
</section>


{#if infoUser}
    <div class="posts-container">
        {#each infoUser.posts as {img} }
            <div class="card-image">
                <img src="{img}" alt="" id="image">
                <div class="overlay"></div>
                <div class="actions">
                    <div class="user-info">
                        <a href="/profile/{infoUser.username}">
                            <img id="profile-img" src="{infoUser.profileImg}" alt="profile picture of {infoUser.username}">
                        </a>
                        <a href="/profile/{infoUser.username}">{infoUser.username}</a>
                    </div>

                    <a href="{img}" download>
                        <img src="../download.svg" alt="download icon">
                    </a>
                </div>
            </div>
        {/each}
    </div>
{/if}


<style lang="scss">
    section{
        height: 280px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 30px;

        border-bottom: 1px solid #767676;
        margin-bottom: 50px;

        img{
            height: 100px;
            width: 100px;
            border-radius: 50%;
        }
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

    a{
        color: white;  
    }
</style>