const themeBodyChange = (isModeLigth) => {
  const getLocalStorage = getThemeLocalStorage()
  if (isModeLigth === "ligth") {
    document.body.classList.remove("dark-only");
  } else {
    document.body.classList.add("dark-only");
  }

  localStorage.setItem('ui', JSON.stringify({
    ...getLocalStorage,
    theme: isModeLigth
  }))
};

export const changeUiThemeDarkOrLigth = (theme = 'ligth') => themeBodyChange(theme)

const getThemeLocalStorage = () =>
  JSON.parse(localStorage.getItem("ui")) || { theme: "ligth", isClose: false };

export const initThemeUi = () => {
  const { theme, isClose } = getThemeLocalStorage();
  themeBodyChange(theme);
  return { theme, isClose };
};

export const changeOpenClose = () => {
  const StorageUi = getThemeLocalStorage();
  const isClose = !StorageUi.isClose;

  localStorage.setItem(
    "ui",
    JSON.stringify({
      ...StorageUi,
      isClose,
    })
  );
  return isClose;
};

export const changeThemeUI = () => {
  let StorageUi = getThemeLocalStorage();
  let theme = StorageUi.theme === "ligth" ? "dark" : "ligth";
  themeBodyChange(theme);
  localStorage.setItem(
    "ui",
    JSON.stringify({
      ...StorageUi,
      theme,
    })
  );
  return theme;
};

export const fullScreen = () => {
  if (
    (document.fullScreenElement && document.fullScreenElement !== null) ||
    (!document.mozFullScreen && !document.webkitIsFullScreen)
  ) {
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen(
        Element.ALLOW_KEYBOARD_INPUT
      );
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
};
