export const opacity = {
    initial: {
        opacity: 0
    },
    open: {
        opacity: 1,
        transition: {duration: 0.35}
    },
    closed: {
        opacity: 0,
        transition: {duration: 0.35}
    }
}

const transition = {duration: 1, ease: [0.76, 0, 0.24, 1]}

export const background = {
    initial: {
        height: 0
    },
    open: {
        height: "100vh",
        transition
    },
    closed: {
        height: 0,
        transition
    }
}


