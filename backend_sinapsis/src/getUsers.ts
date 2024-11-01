import { APIGatewayProxyHandler } from 'aws-lambda';
//import { User } from './models/modelUser';


export const getUserAll: APIGatewayProxyHandler = async (event) => {
    try {
      // const foundUser = await User.findAll({
      //   attributes: ['id', 'nombre', 'correo_electronico', 'contrasena', 'fecha_creacion'],
      // });
  
      // if (foundUser && foundUser.length > 0) {
      //   return {
      //     statusCode: 200,
      //     body: JSON.stringify({
      //       message: "Usuario encontrado .",
      //       users: foundUser,
      //     }),
      //   };
      // }
  
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "No existen registros",
        }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Ocurrió un error en el servidor',
          details: error.message,
        }),
      };
    }
  };
