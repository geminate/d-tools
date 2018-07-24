const state = {
    showBack: false
};

const getters = {
    getShowBack(state) {
        return state.showBack;
    }
};

const mutations = {
    setShowBack(state, showBack) {
        state.showBack = showBack;
    }
};

const actions = {};

export default {
    state,
    getters,
    mutations,
    actions
}
