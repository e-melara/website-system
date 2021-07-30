const themeBodyChange = (isModeLigth) => {
  if (isModeLigth === "ligth") {
    document.body.classList.remove("dark-only");
  } else {
    document.body.classList.add("dark-only");
  }
};

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
