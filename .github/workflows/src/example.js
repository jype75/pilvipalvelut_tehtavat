class Logger {
    static instance;

    static getInstance () {
        if (Logger.instance) {
            Logger.instance = new Logger ();    
        }
        return Logger.instance;
    }
}

function createUser() {
    return{};
}