import { APIGatewayProxyHandler } from 'aws-lambda';
//import { User } from './models/modelUser';
import { idSchema } from './validations/userSchema'; 

export const getUserId: APIGatewayProxyHandler = async (event) => {
  try {
   
    // const parsedBody = idSchema.safeParse(JSON.parse(event.body || '{}'));

    // if (!parsedBody.success) {
    //   return {
    //     statusCode: 400, 
    //     body: JSON.stringify({
    //       error: "Error de validación",
    //       details: parsedBody.error.errors, 
    //     }),
    //   };
    // }

    // const { id } = parsedBody.data;

  
    // const foundUser = await User.findOne({
    //   where: { id },
    //   attributes: ['id', 'nombre', 'correo_electronico', 'contrasena', 'fecha_creacion'],
    // });

    // if (foundUser) {
    //   return {
    //     statusCode: 200, 
    //     body: JSON.stringify({
    //       message: "Usuario encontrado exitosamente",
    //       user: foundUser,
    //     }),
    //   };
    // }

    return {
      statusCode: 404, 
      body: JSON.stringify({
        message: "Usuario no encontrado",
      }),
    };
  } catch (error) {
    return {
      statusCode: 500, 
      body: JSON.stringify({
        error: "Ocurrió un error en el servidor",
        details: error.message,
      }),
    };
  }
};
