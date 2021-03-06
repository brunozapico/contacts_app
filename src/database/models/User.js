module.exports = (sequelize, dataTypes) => {
    let alias = 'User';

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        full_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        username: {
            type: dataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        avatar: {
            type: dataTypes.STRING(100),
            allowNull: false,
            defaultValue: `img/user/avatar/no_avatar.png`
        },
    };

    let config = {
        tableName: 'users',
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
        User.hasMany(models.Contact, {
            as: 'contacts',
            foreignKey: 'user_id'
        });
    };

    return User;
};