module.exports = (sequelize, dataTypes) => {
    let alias = 'Contact';

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        full_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        number: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        avatar: {
            type: dataTypes.STRING(100),
            allowNull: false,
            defaultValue: `img/contacts/avatar/no_avatar.png`
        },
    };

    let config = {
        tableName: 'contacts',
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const Contact = sequelize.define(alias, cols, config);

    Contact.associate = (models) => {
        Contact.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        });
    };

    return Contact;
};