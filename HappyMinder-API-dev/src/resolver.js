import { existedTypeNameMessage } from "graphql/validation/rules/UniqueTypeNames";
import {Habit} from "./models/habit";
import {User} from "./models/user";
import {HabitsSelected} from "./models/user_habit";
import {HabitTrack} from "./models/user_habit_track";
import { Url } from "./models/url";
import { Pagetime } from "./models/pagetime";
import bcrypt from "bcrypt";

export const resolvers = {
    Query: {
        test:() => 'Texto de Prueba',
        //Habits Queries
        habits:() => Habit.find(),
        habitById: async (_, {id})=>{
            try{
                const habit=  await Habit.findById(id);
                return habit;
            }catch (error){
                console.log(error);
            }
        },
        habitsByDesiredImpact: async (_, {desired_impact})=>{
            try{
                const habits=  await Habit.find({desired_impact:desired_impact});
                return habits;
            }catch (error){
                console.log(error);
            }
        }, 
        // categorias de los habitos
        desiredImpacts:() => Habit.find().distinct('desired_impact'),
             
        //User Queries
        users:() => User.find(),
        usersHabits: () => HabitsSelected.find(),

        //url queries
        urls:() => Url.find(),

        //UserbyName Queries
        userbyName: async (_,{userName})=> {
            try{
            const usr = await User.find({user_name:userName});
             return usr[0];
            }catch (error){
                console.log(error);
            }
        },
        
        //UserHabits Queries
        habitsByUser: async (_,{userId})=>{
            const habits = await HabitsSelected.find({user:userId, state:"ACTIVE"});
            return habits;       
        },
        //Trae el habito que debiera realizar el usuario
        habitToDo: async (_, {userId})=>{
            try{
                var i=0;
                //obteniendo la fecha de hoy
                let date_ob = new Date(Date.now());
                let date =("00" + date_ob.getDate()).slice(-2)+"-"+("00" + (date_ob.getMonth()+1)).slice(-2)+"-"+date_ob.getFullYear();  
                var habitToDo=  await Habit.findById("620a8c96ac9640a51b3093de");   
                const habits1 = await HabitsSelected.find({user:userId, state:"ACTIVE"});  
                 // buscar si el usuario tiene habitos  seleccionado              
                 if (habits1.length==0){
                    //el usuario no tiene habitos   
                    //retorna el habito nulo
                      console.error("el usuario no tiene habitos");
                      return habitToDo;
                 } else {
                    while(i<1000)
                    {   i++;    
                        //calcula un valor random entre 1 y 100 para buscar un habito random         
                        let rand = Math.round(Math.random()*100);    
                        // por cada habito seleccionado valida si lo ha hecho hoy o no                        
                        const habits = await HabitsSelected.find({user:userId, state:"ACTIVE", random:rand});                                               
                        for (var element of habits)
                        {
                            var {_id} = element;
                            // verifica si los habitos realizados hoy por el usuario, contienen el habitos seleccionado                               
                            var toDayHabits = await HabitTrack.find({date:date, user:userId, habitSelected:_id, action:"Done"})                     
                            //si no está entonces retorna este
                            if(toDayHabits.length==0){ 
                                //console.log("el habito NO se ha hecho hoy");
                                var {habit}= element;
                                habitToDo=  await Habit.findById(habit);
                                return habitToDo;                       
                            } 
                        }   
                    }  
                    //al usuario no le quedan más habitos en el día, retorna el habito nulo*         
                    return habitToDo;   
                }          
            }catch (error){
                console.log(error);
            }
        }, 
        //Resolver que busca la categorias de un usuario
        desiredImpactsByUser: async (_,{userId})=>{
            let result = [];
            const habits = await HabitsSelected.find({user:userId});            
            for (const element of habits)
                { 
                     result.push(element.desired_impact); 
                                    
                }  
                const distictResults = [... new Set(result)];               
            return distictResults;       
        },
        //Resolver que entrega trakeo de habitos.
        trackHabits:() => HabitTrack.find(),
        trackHabitsByUser: async (_,{userId})=>{
            const habits = await HabitTrack.find({user:userId});
            return habits;       
        },
        userHabitsbyID: async (_,{id})=>{
            const habits = await HabitsSelected.findById({_id:id});
            return habits; 
        },
        pagetimesByUser: async (_, { userId }) => {
            try {
                // Buscar todos los Pagetime asociados al usuario
                const pagetimes = await Pagetime.find({ user: userId });
                return pagetimes;
            } catch (error) {
                console.error("Error fetching Pagetimes by user:", error);
                throw new Error("Error fetching Pagetimes by user");
            }
        }
    },
    Mutation: {       
        createHabit: async(_, {input}) => {
            try{      
                const habit = new Habit(input);                
                const result= await habit.save();
                return result;
            }catch (error){
                console.log(error);
            }            
        },
        updateHabit:async(_, {id, input}) => { 
            let habit = await Habit.findById(id)
            if(!habit){throw new Error ('el habito no existe');}
            habit= await Habit.findOneAndUpdate({_id: id}, input, {new:true});
            return habit;
        },
        //User Mutations
        createNewUser: async(_, {input}) => {
            try{
                const usr = await User.find({user_name:input.user_name /* , password:input.password */});
                console.log("Usr: ", usr);
                if (usr.length==0 && input.password.length!=0){
                    const user = new User(input);
                    console.log(user);                
                    const result= await user.save();
                    console.log(result);
                    return result;
                }
                else{
                    console.log("Error al crear usuario")
                }
            } catch (error){
                console.log(error);
            }            
        },
        ValidateOldUser: async(_, {input}) => {
            try{
                const usr = await User.find({user_name:input.user_name});
                console.log("Usr: ", usr);
                if(usr.length!=0 && input.password.length!=0){
                    if (usr[0].password === undefined){
                        bcrypt.hash(input.password, 10, (err, hashedPassword) => {
                            if (err) {
                              console.error('Error al generar el hash de la contraseña:', err);
                            } else {
                              // Actualiza el usuario específico con el nuevo hash de contraseña
                              User.updateOne(
                                { _id: usr[0].id }, // Filtra por ID del usuario
                                { $set: { password: hashedPassword } }, // Establece el nuevo valor del campo "password" como el hash
                                (updateErr, result) => {
                                  if (updateErr) {
                                    console.error('Error al actualizar el usuario:', updateErr);
                                  } else {
                                    console.log('Usuario actualizado:', result);
                                  }
                                }
                              );
                            }
                          });
                        return usr[0];
                    }
                }
                else{
                    console.log("Error al validar usuario")
                }
            } catch (error){
                console.log(error);
            }            
        },


        ValidateUser: async(_, {input}) => {
            try{
                const usr = await User.find({user_name:input.user_name});
                console.log("Usr: ", usr);
                const passwordMatch = await bcrypt.compare(input.password, usr[0].password);
                if(passwordMatch){
                    return usr[0];
                }
                else{
                    console.log("Error al validar usuario")
                }
            } catch (error){
                console.log(error);
            }            
        },

        SaveNewUrl: async (_, { input }) => {
            try {
                const existingUrl = await Url.findOne({ url_name: input.url_name, user: input.user });

                if (existingUrl) {
                  return { message: "El usuario ya tiene una URL existente" };
                } else {
                    // Si la URL no existe, guardar una nueva URL
                    const newUrl = new Url(input);
                    const savedUrl = await newUrl.save();
                    return savedUrl;
                }
            } catch (error) {
                console.error("Error saving URL:", error);
                throw new Error("Error saving URL to the database");
            }
        }, 
        //UserHabit Mutations   
        createNewUserHabit: async(_, {input}) => {
            try{
                const {user} = input
                let userExist = await User.findById(user);
                const {habit} = input
                let hbtExist = await Habit.findById(habit);
                
                //esto no está funcionando, si se le pasa un id no existente se cae
                if(!userExist || !hbtExist ){
                    throw new Error ('el habito o usuario no existe');
                }
                const userhabit = new HabitsSelected(input);                
                const result= await userhabit.save();
                return result;               
            }catch (error){
                console.log(error);
            }            
        },
        /*
        updateHabitUser:async(_, {id, input}) => { 
            try{
                let habituser = await HabitsSelected.findById(id);
                console.log(habituser);
                if(!habituser){throw new Error ('la asociación no existe');}
                habituser= await HabitsSelected.findOneAndUpdate({_id: id}, input, {new:true});
                return habituser;
            }catch (error){
                console.log(error);
            }  
        },*/
        //debería cambiarle el nombre a createHabitsUserByCategory
        createHabitsUser: async(_, {input}) => {
            try{ 
                //buscar que el usuario exista
                const {user} = input;      
                 //traer todos los habitos de esa categoria
                const {desiredImpact}=input;
                const habits= await Habit.find({desired_impact:desiredImpact});
                //recorrer el arreglo y en cada vuelta crear el user_habit
                for (const element of habits) {     
                    const {_id} = element;
                   // verifica si el habito está  seleccionado                                              
                    const habitselected = await HabitsSelected.find({user:user, habit:_id})
                   //si no está entonces lo agrega
                    if(habitselected.length==0){
                    const rand = Math.round(Math.random()*100);
                   // console.log('rand: '+ rand);
                    const userhabit = new HabitsSelected({user:user,habit:_id,state:"ACTIVE",desired_impact:desiredImpact, random: rand});                
                    const result= await userhabit.save(); 
                    }
                    else{
                        //mejorar para que GraphQL realmente lance el mensaje de error de verdad
                        throw new Error('los habitos ya están seleccionados');                        
                    }               
                }       
                return "OK";
            }catch (error){
                console.log(error);
            }  
        },
        createHabitTrack: async(_, {input}) => {
            try{ 
                //asume que el selectedHabit existe **mejorar en el futuro**
                //toma la fecha desde la entrada y la guarda como string **mejorar en el futuro**
                const habituser2 = await HabitsSelected.findOne({user:input.user, habit:input.habitSelected});                
                const {_id} = habituser2;                
                const track = new HabitTrack({habitSelected:_id, action:input.action, date:input.date, user:input.user});                
                const result= await track.save();
                return result;
            }catch (error){
                console.log(error);
            }  
        },
        deleteHabitsUserByCategory: async(_, {input}) => {
            try{ 
                //buscar que el usuario exista
                const {user} = input;               
                let userExist = await User.findById(user);

                //traer todos los habitos de esa categoria
                const {desiredImpact}=input;
                const habits= await Habit.find({desired_impact:desiredImpact});
                 //recorrer el arreglo y en cada vuelta ver si existe, si existe lo quita 
                for (const element of habits)
                {
                    const {_id} = element;
                   // verifica si el habito está  seleccionado                               
                    const habitselected = await HabitsSelected.find({user:user, habit:_id})
                   //si no está entonces lo agrega
                    if(habitselected.length!=0){ 
                        //console.log("eliminando el habito");
                        const result = await HabitsSelected.deleteOne({user:user, habit:_id});                    
                    }                 
                }                  
                return "ok";
            }catch (error){
                console.log(error);
            }  
        },
        createOrUpdatePagetime: async (_, { input }) => {
            try {
                const { url, date, time, user } = input;

                // Buscar si ya existe un Pagetime con la misma URL, fecha y usuario
                const existingPagetime = await Pagetime.findOne({ url, date, user });

                if (existingPagetime) {
                    // Si existe, actualiza el time sumándolo al time existente
                    existingPagetime.time = (parseInt(existingPagetime.time) || 0) + parseInt(time);
                    const updatedPagetime = await existingPagetime.save();
                    return updatedPagetime;
                } else {
                    // Si no existe, crea un nuevo Pagetime
                    const newPagetime = new Pagetime({ url, date, time, user });
                    const savedPagetime = await newPagetime.save();
                    return savedPagetime;
                }
            } catch (error) {
                console.error("Error creating/updating Pagetime:", error);
                throw new Error("Error creating/updating Pagetime");
            }
        },
        deleteUrl: async (_, { input }) => {
            try {
              const { urlName, userId } = input;
        
              // Check if the URL exists for the specified user
              const urlToDelete = await Url.findOne({ url_name: urlName, user: userId });
        
              if (!urlToDelete) {
                throw new Error('URL not found for the specified user');
              }
        
              // Delete the URL
              const result = await Url.deleteOne({ url_name: urlName, user: userId });
        
              if (result.deletedCount > 0) {
                return 'URL deleted successfully';
              } else {
                throw new Error('Failed to delete the URL');
              }
            } catch (error) {
              console.error('Error deleting URL:', error);
              throw new Error('Error deleting URL');
            }
          }
        
        
    }
}