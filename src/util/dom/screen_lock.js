export const lockScreenView = (currentScrollY = 0) => {
    const appLayoutGroup = document.querySelector('.app-layout-group');

    if (appLayoutGroup) {
        appLayoutGroup.style.overflow = 'hidden';
        appLayoutGroup.style.position = 'fixed';
        appLayoutGroup.style.top = `-${currentScrollY}px`;
        appLayoutGroup.style.width = '100%';
    }

    document.body.style.overflowY = 'scroll';
};

export const unlockScreenView = (scrollY = 0) => {
    const appLayoutGroup = document.querySelector('.app-layout-group');

    if (appLayoutGroup) {
        appLayoutGroup.style.overflow = '';
        appLayoutGroup.style.position = '';
        appLayoutGroup.style.top = ``;
        appLayoutGroup.style.width = '';
    }

    document.body.style.overflowY = '';

    window.scrollTo(0, scrollY)
};