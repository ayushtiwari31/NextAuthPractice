import {Connection} from mongoose;

declare global{
    var mongoose:{
        conn:Connection|null,
        promise:Promise<Connection>|null
    }
}

export {};


// import { Connection } from "mongoose";

// declare global {
//   namespace NodeJS {
//     interface Global {
//       mongoose: {
//         conn: Connection | null;
//         promise: Promise<Connection> | null;
//       };
//     }
//   }
// }

// export {};
