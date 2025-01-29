import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logoutProfile } from '../../features/session/session_slice';
import onChangeHandlerInput from '../../util/on_change_handler_input_util'
import '../../../assets/stylesheets/navbar.scss'
import logo from '../../../assets/images/animeflix-logo.svg'
import searchIcon from '../../../assets/images/search-icon.svg'
import bellIcon from '../../../assets/images/bell-icon.svg'
import BACKGROUNDS from '../../../assets/images/profile_icons/profile_icons'
import { IoCloseSharp } from 'react-icons/io5'
import pencilIcon from '../../../assets/images/dropdown_menu_icons/pencil_icon.svg'
import transferProfileIcon from '../../../assets/images/dropdown_menu_icons/transfer_profile_icon.svg'
import accountIcon from '../../../assets/images/dropdown_menu_icons/account_icon.svg'
import helpIcon from '../../../assets/images/dropdown_menu_icons/help_icon.svg'


const NavBar = () => {
    // redux state


    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const profiles = useSelector(state => state.entities.profiles) 
    const profile = useSelector(state => state.session.profile) 

    const placeholder = 'Titles, people, genres'
    const [searchQuery, setSearchQuery] = useState('')
    const [searchBar, setSearchBar] = useState('')
    const [menuDropdown, setMenuDropdown] = useState('none')
    const [isHovering, setIsHovering] = useState(false)
    const [scrollPosition, setScrollPosition] = useState([0, 0])

    const dropdownTimerId = useRef(null)

    useEffect(() => {
        document.addEventListener('scroll', () => {
            setScrollPosition([window.scrollX, window.scrollY])
        })
    })

    const toggleSearchBar = () => {
        !searchBar ? setSearchBar('searchbar-active') : setSearchBar('')
    }

    // onChange for the input you need to save to redux and push client to /search/:searchQuery
    // function here
    const handleSearch = () => {
        // maybe func name will change, just defining it
    }

    const handleManageProfileNav = () => {
        dispatch(logoutProfile())
        navigate('/manage-profiles')
    }

    const dropDropdownMenu = () => {
        setMenuDropdown('block')
        setIsHovering(true)
        dropdownTimerId.current = setTimeout(() => {
            setMenuDropdown('none')
            setIsHovering(true)
        }, 3000)
    }

    const hideDropdown = () => {
        setTimeout(() => {
            setMenuDropdown('none')
            setIsHovering(false)
        }, 200)
    }

    const handleBlur = () => {
        if (!searchQuery) {
            toggleSearchBar()
        }
    }

    const handleClose = () => {
        setSearchQuery('')
        toggleSearchBar()
    }

    const handleLogout = () => {
        dispatch({ type: 'SIGN_OUT'})
        navigate('/')
    }

    const searchBox = () => {
        return (
            <div className='searchbox secondary-nav-element'>
                    <img src={searchIcon} alt="search-icon" className='search-icon'/>
                    <input 
                        type="text" 
                        className='search-input'
                        value={searchQuery}
                        placeholder={placeholder}
                        onChange={onChangeHandlerInput(setSearchQuery)}
                        onBlur={handleBlur}
                        autoFocus 

                    />
                    <IoCloseSharp 
                        className='close' 
                        onClick={handleClose} 
                        style={{visibility: searchQuery ? 'visible' : 'hidden'}}
                    />
                </div>
        )
    }
    
    const listTabItem = (endpoint, tabName) => {
        return (
            location.pathname.includes(endpoint) ? 
            (
                <li className='current'>{tabName}</li>
            ) : 
            (
                <li 
                    className='nav-tab' 
                    onClick={() => navigate(`/${endpoint}`)} 
                >
                    {tabName}
                </li>
            )
        )

        // maybe the handleNavigation is not even needed just from there you can navigate
    }

    const listProfile = (profile, idx) => {
        
        return (
            <li key={profile.id} className='dropdown-profile' onClick={() => console.log(profile.name)}>
                <img src={BACKGROUNDS[idx]} alt="profile icon" />
                <p>{profile.name}</p>
            </li>
        )
    }

    const defaultBackgroundStyle = {
        background: 'transparent', 
        'background-image': 'linear-gradient(180deg, rgba(0, 0, 0, .7) 10%, transparent)', 
        transition: 'background 1s, height 2s, font-size 2s',
    }

    const backgroundStyle = {
        'background-color': 'rgb(20, 20, 20)', 
        transition: 'background-color 1s, height 2s, font-size 2s',
        position: 'fixed',
        top: '0px',
        right: 0, 
        left: 0,
    }

    return (
        <header className='nav'>
            {/* nav content for background */}
            <nav className='nav-content' style={scrollPosition[1] > 1 ? backgroundStyle : defaultBackgroundStyle}>
                <img src={logo} alt="logo" className="nav-logo" />

                <ul className='primary-nav'>
                    {/* I may need one more for when the screen gets smaller */}
                    {listTabItem('browse', 'Home')}
                    {listTabItem('tv-shows', 'TV Shows')}
                    {listTabItem('movies', 'Movies')}
                    {listTabItem('latest', 'New & Popular')}
                    {listTabItem('watchlist', 'My List')}
                </ul>

                <div className='secondary-nav '>
                    {searchBar ? searchBox() : 
                    (
                        <button className='search-icon-focus secondary-nav-element'>
                            <img
                                src={searchIcon}
                                alt="search-icon"
                                className='search-icon secondary-nav-element nav-element-hover'
                                onClick={toggleSearchBar}
                            />
                        </button>
                    )}
        
                    <img 
                        src={bellIcon}
                        alt="notifiction-icon" 
                        className='bell-icon secondary-nav-element nav-element-hover'
                    />
                    
                    {/* Dropdown menu */}
                    <div className='account-menu-container secondary-nav-element'>
                        <div 
                            className='account-dropdown-buttons nav-element-hover' 
                            onMouseEnter={dropDropdownMenu}
                        >
                            {/* The background profile icon has to be dynamic */}
                            <div 
                                className='profile-menu-icon' 
                                style={{ backgroundImage: `url('${BACKGROUNDS[1]}')` }}
                            >
                            </div>

                            <div 
                                className='caret' 
                                style={isHovering ? { transform: 'rotate(0.5turn)'} : {}}
                            >
                            </div>
                        </div>

                        {/* Menu Dropdown */}
                        <div 
                            className='menu' 
                            style={{ display: menuDropdown }} 
                            onMouseEnter={() => clearTimeout(dropdownTimerId.current)}
                            onMouseLeave={hideDropdown}
                        >
                            <ul className='dropdown-menu-profiles'>
                                {
                                    profiles
                                    .filter(prof => prof.id !== profile.id)
                                    .map((prof, idx) => listProfile(prof, idx))
                                }
                            </ul>

                            <ul className='sub-menu-list'>
                                <li className='sub-menu-item' onClick={handleManageProfileNav}>
                                    <img src={pencilIcon} alt='pencil icon'/>
                                    <p>Manage Profiles</p>
                                </li>

                                <li className='sub-menu-item'>
                                    <img src={transferProfileIcon} alt='transfer icon'/>
                                    <p>Transfer Profile</p>
                                </li>

                                <li className='sub-menu-item'>
                                    <img src={accountIcon} alt='account icon' />
                                    <p>Account</p>
                                </li>

                                <li className='sub-menu-item'>
                                    <img src={helpIcon} alt='help icon' />
                                    <p>Help Center</p>
                                </li>
                            </ul>

                            <div 
                                className='signout-container' 
                                onClick={handleLogout}
                            >
                                <p>Sign out of Animeflix</p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}


export default NavBar

// empty strings are falsy
// have to change the tv endpoint to tv-shows
// have to change movie endpoint to movies

// ?
    // A check needs to be made when handleManageProfileNav
    // if the user goes back they are going to be directed 
    // to choose a profile

// ?
    // DRY way of handling making the state empty

// ?
    // top level way of resetting the redux store