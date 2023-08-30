<script>
    import { onMount } from "svelte";
    import { user } from "../../lib/stores";
    import Nav from "../../components/nav.svelte";
    import { getInfoUser } from "../../servicies/imageService";

    let userInfo;

    onMount(async () =>{
        const username= $user.displayName.replace(/\s/g, '');
        userInfo= await getInfoUser(username);
    });

</script>

<Nav></Nav>


<section>
    {#if $user}
        <img src="{$user.photoURL}" alt="profile image of the user {$user.displayName}" loading="lazy">
        <div>
            <h1>{$user.displayName}</h1>
            <p>Descarga bellas fotos gratuitas de alta <br/> calidad seleccionadas por {$user.displayName}</p>
        </div>
    {/if}
</section>


{#if userInfo}
    {#each userInfo.posts as post}
        <img src="{post.img}" alt="">
    {/each}
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
</style>