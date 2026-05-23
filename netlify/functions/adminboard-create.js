// const { MongoClient } = require("mongodb");

// let client;

// exports.handler = async (event) => {
//   try {
//     if (event.httpMethod !== "POST") {
//       return {
//         statusCode: 405,
//         body: JSON.stringify({ success: false, message: "Only POST allowed" })
//       };
//     }

//     if (!process.env.MONGODB_URI) {
//       return {
//         statusCode: 500,
//         body: JSON.stringify({ success: false, message: "MONGODB_URI missing" })
//       };
//     }

//     const body = JSON.parse(event.body);

//     if (!body.symbol || !body.option || !body.sticke || !body.no_of_lot) {
//       return {
//         statusCode: 400,
//         body: JSON.stringify({ success: false, message: "All fields required" })
//       };
//     }

//     if (!client) {
//       client = new MongoClient(process.env.MONGODB_URI);
//       await client.connect();
//     }

//     const db = client.db("Trodern_DB");
//     const collection = db.collection("adminboard");

//     const now = new Date();

//     const result = await collection.insertOne({
//        type: body.type || "BUY",
//       symbol: body.symbol,
//       option: body.option,
//       sticke: body.sticke,
//       no_of_lot: Number(body.no_of_lot),
//       createdAt: now    
//     });

//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         success: true,
//         message: "Saved Successfully",
//         id: result.insertedId
//       })
//     };

//   } catch (error) {
//     console.log("MongoDB Error:", error);

//     return {
//       statusCode: 500,
//       body: JSON.stringify({
//         success: false,
//         message: error.message
//       })
//     };
//   }
// };
const { MongoClient, ObjectId } = require("mongodb");

let client;

async function getCollection() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
  }

  const db = client.db("Trodern_DB");
  return db.collection("adminboard");
}

exports.handler = async (event) => {
  try {
    if (!process.env.MONGODB_URI) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          message: "MONGODB_URI missing"
        })
      };
    }

    const collection = await getCollection();

    // SELECT
    if (event.httpMethod === "GET") {
      const data = await collection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          data
        })
      };
    }

    const body = event.body ? JSON.parse(event.body) : {};

    // INSERT
if (event.httpMethod === "POST") {

  if (!body.items || body.items.length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "Table data is empty"
      })
    };
  }

  const now = new Date();

  const insertData = body.items.map(item => ({
    type: body.type || "BUY",
    symbol: item.symbol,
    option: item.option,
    sticke: item.sticke,
    no_of_lot: Number(item.no_of_lot),
    createdAt: now
  }));

  const result = await collection.insertMany(insertData);

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      message: "All table details saved successfully",
      insertedCount: result.insertedCount
    })
  };
}

    // UPDATE
    if (event.httpMethod === "PUT") {
      if (!body.id) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            success: false,
            message: "ID required"
          })
        };
      }

      await collection.updateOne(
        { _id: new ObjectId(body.id) },
        {
          $set: {
            symbol: body.symbol,
            option: body.option,
            sticke: body.sticke,
            no_of_lot: Number(body.no_of_lot),
            modifiedAt: new Date()
          }
        }
      );

      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: "Updated successfully"
        })
      };
    }

    // DELETE
    if (event.httpMethod === "DELETE") {
      if (!body.id) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            success: false,
            message: "ID required"
          })
        };
      }

      await collection.deleteOne({
        _id: new ObjectId(body.id)
      });

      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: "Deleted successfully"
        })
      };
    }

    return {
      statusCode: 405,
      body: JSON.stringify({
        success: false,
        message: "Method not allowed"
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: error.message
      })
    };
  }
};