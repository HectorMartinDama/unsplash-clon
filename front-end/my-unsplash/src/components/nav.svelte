
<script>
    import { login, logout, notificationLogin, notificationLogout } from '../servicies/oauthService';
    import { isLoggedIn, user } from '../lib/stores';
    import { onMount } from 'svelte';
    import Modal from './modal.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { getCategoriesNames } from '../servicies/categoryService';
    

    let categoriesNames;


    onMount(async () =>{
        document.addEventListener('click', e =>{
            const isDropDownButton= e.target.matches('[data-dropdown-button]');
            if(!isDropDownButton && e.target.closest('[data-dropdown]') != null) return;

            let currentDropDown;

            if(isDropDownButton){
                currentDropDown= e.target.closest('[data-dropdown]');
                currentDropDown.classList.toggle('active');
            }

            document.querySelectorAll('[data-dropdown].active').forEach(dropdown =>{
                if(dropdown === currentDropDown) return
                dropdown.classList.remove('active');
            });
        })

        categoriesNames= await getCategoriesNames();
    })
   
</script>

<nav>

    <div class="first-group">
        <div class="group">
            <a href="/"><img src="my_unsplash_logo.svg" alt="brand logo"></a>
            <input type="search">
        </div>
    
    
        <div class="group">
            <Modal/>
            {#if $isLoggedIn }
                <div class="dropdown" data-dropdown>
                    <img src={$user.photoURL} alt="google profile picture" class="link profile-img" data-dropdown-button>
                    <div class="dropdown-menu">
                        <ul>
                            <li>{$user.displayName}</li>
                            <li>{$user.email}</li>
                            <li><a href="/profile">Perfil</a></li>
                            <li><a on:click={notificationLogout}>Cerrar Sesión</a></li>
                        </ul>
                    </div>
                </div>
            {:else}
                <button on:click={notificationLogin}>Login</button>
            {/if}
        </div>
    </div>


    <div class="sub-nav">
        <div class="tab-box">
            {#if categoriesNames}
                {#each categoriesNames as { name} }
                    <a href="/{name.toLowerCase()}" class="tab-url">{name}</a>
                {/each}
            {/if}
        </div>
    </div>

 
</nav>


<Toaster/>


<style lang="scss">

   

    .dropdown{
        position: relative;
    }

    .dropdown-menu{
        position: absolute;
        right: 30px;
        top: calc(100% + .25rem);
        background-color: white;
        padding: .75rem;
        border-radius: 10px;
        box-shadow: 0 2px 5px 0 rgb(0, 0, 0, .1);
        opacity: 0;
        transform: translateY(-10px);
        transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
        width: 220px;

        ul{
            list-style: none;
        }
        li{
            &:hover{
                background-color: #EEEEEE;
            }
        }
    }

   :global(.dropdown.active > .link + .dropdown-menu) {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
   }

   .first-group{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
   }

   .sub-nav{
        background-color: white;
       
   }


   .tab-box{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid rgba(229, 229, 229);


        .tab-url{
            color: #919191;
            text-decoration: none;
            background: none;
            border: none;
            cursor: pointer;
            padding: 15px;
        }
   }


   





    nav{
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 0;
        width: 100%;
        height: 62px;
        z-index: 2;
        background-color: white;
    }

    .profile-img{
        border-radius: 50%;
        width: 45px;
        cursor: pointer;
    }

    .group{
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>