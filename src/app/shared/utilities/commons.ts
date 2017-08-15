import { LOG_TYPE } from "../types/logger_types";

export class Commons {

    static IS_DEBUG: boolean = true;

    static LOGGER_LEVEL: string = "log";


    // common logging method
    public static log(level: string, ...message): void {

        if (this.IS_DEBUG) {

            level = level || this.LOGGER_LEVEL;
            if (LOG_TYPE.indexOf(level) == -1) {
                level = this.LOGGER_LEVEL
            }
            
            var msg = "";
            message.forEach(m => {
                if(typeof m == "object"){
                    m = JSON.stringify(m);
                }
                msg = msg.concat(m);
            })

            console[level](msg);

        }

    }

}