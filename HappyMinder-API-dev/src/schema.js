import { gql } from 'apollo-server-express';

export const typeDefs = gql`
#objeto en que cargamos los resultados de ls BD
type Habit {
    id: ID
    url_image: String
    url_video: String
    message: String
    frequency: String
    input_type: String
    desired_impact: String
    complementary_information: String
    timer_long: Int
    times: Int
    next_habit: ID
    output: String
    post_action: String
}
#Objeto que utilizamos para poblar la BD
input HabitInput {
    url_image: String
    url_video: String
    message: String!
    frequency: String
    input_type: String
    desired_impact: String
    complementary_information: String
    timer_long: Int
    times: Int
    next_habit: String
    output: String
    post_action: String
}
# Objeto usuario para retornar usuarios
type User {
    id: ID
    user_name: String
    password: String
    origin: String
    state: EstadoUser
    last_login: String
}
# objeto que se utilizara para guardar y leer datos de urls en la base de datos
type Url {
    id: ID
    url_name: String
    user: ID!
    date_creation: String
}

# objeto para guardar url

input SaveUrl{
    url_name: String!
    user: ID!
    date_creation: String

}

# Objeto usuario para crear usuarios
input UserInput {
    user_name: String!
    password: String
    origin: String
    state: EstadoUser
    last_login: String
}
enum EstadoUser {
    ACTIVE
    INACTIVE
    BLOCKED
}
# Objeto para retornar todas las relacions usuario y habito
type UsersHabits {
    id: ID
    state:EstadoUserHabit
    created: String
    habit: ID!
    user: ID!
}
# Objeto para retornar los habitos de un usuario
type UserHabits {
    id: ID
    state:EstadoUserHabit
    created: String
    habit: ID!
    user: ID!
    desiredImpact: String!
}
type HabitsTrack{
    id: ID
    habitSelected:ID!
    date:String!
    action:String!
    user:ID!
  }

type habittracks{
    id: ID
    habitSelected:ID!
    date:String!
    action:EstadoHabitos
    user:ID!
}

type pagetime{
    id: ID
    date: String!
    time: String!
    url: String!
    user: ID!
}

enum EstadoHabitos{
     Done
     Undone
     DONE
     UNDONE
     NotDone
     UNDone
}
# Objeto UserHabits para crear los habitos seleccionados por los usuarios
input UserHabitInput {
    state:EstadoUserHabit
    created: String
    habit: ID!
    user: ID!
    desiredImpact: String!
}
input pageTimeInput {
    date: String!
    time: String!
    url: String!
    user: ID!
}
enum EstadoUserHabit {
    ACTIVE
    INACTIVE
}
input HabitsDesiredImpactInput{
    user: ID!
    desiredImpact: String!
   }

input HabitsTrackInput{
     habitSelected: ID!
     action:String!
     date:String!
     user:ID!
   }

input DeleteUrlInput {
    urlName: String!
    userId: ID!
  }

#aqui comienzan las consultas
type Query {
    test: String!,
    habits: [Habit!]!,    
    desiredImpacts:[String],
    habitsByDesiredImpact(desired_impact: String): [Habit],
    users: [User!]!,
    userbyName(userName:String):User,
    usersHabits: [UsersHabits!],
    userHabitsbyID(id:String): UsersHabits,
    habitsByUser(userId: String): [UserHabits],
    habitById(id: String): Habit, 
    habitToDo(userId:String):Habit,
    desiredImpactsByUser(userId: String):[String],
    trackHabits: [habittracks!]!,
    trackHabitsByUser(userId: String): [habittracks],
    urls: [Url!]!
    pagetimesByUser(userId: ID!): [pagetime!]!
}

#Aquí comienzan los insert, delete y update
type Mutation {
        createHabit(input: HabitInput): Habit!
        updateHabit(id:ID!, input: HabitInput): Habit!
        createNewUser(input: UserInput): User!
        ValidateUser(input: UserInput): User!
        ValidateOldUser(input: UserInput): User!
        createNewUserHabit(input: UserHabitInput): UsersHabits
       # updateHabitUser(id:ID!, input:UserHabitInput): UsersHabits!
        createHabitsUser(input:HabitsDesiredImpactInput): String
        createHabitTrack(input:HabitsTrackInput):HabitsTrack!
        deleteHabitsUserByCategory(input:HabitsDesiredImpactInput):String
        SaveNewUrl(input: SaveUrl): Url!
        createOrUpdatePagetime(input: pageTimeInput): pagetime!
        deleteUrl(input: DeleteUrlInput): String
    }
`;