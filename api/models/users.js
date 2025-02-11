import mongo from "mongoose"

const usersSchema = new mongo.Schema({
    username:
    {
        type: String,
        required: true,
    },
    name:
    {
        type: String,
        required: true,
    },
    email:
    {
        type: String,
        required: true,
        unique: true,
    },
    password:
    {
        type: String,
        required: true,
    },
    accessLevel: {
        type: String,
        required: true,
        enum: [
            "İnsan Kaynakları",
            "Satış & Pazarlama",
            "Bilgi Sistemleri",
            "Kat Hizmetleri",
            "Güvenlik",
            "Teknik Servis",
            "Satınalma",
            "Muhasebe",
            "Mutfak",
            "Yiyecek & İçecek",
            "Animasyon",
            "Kalite",
            "Ön Büro"
        ],
        default: "Güvenlik" // Varsayılan olarak IT atanabilir, ihtiyaca göre değiştirilebilir
      }
});

const Users = mongo.model( "Users", usersSchema );
export default Users;