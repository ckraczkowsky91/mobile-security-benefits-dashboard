var graphql = require('graphql');

const FamilyMember = require('./models');

const {
GraphQLObjectType,
GraphQLString,
GraphQLSchema,
GraphQLID,
GraphQLNonNull
} = graphql;

const FamilyMemberType = new GraphQLObjectType({
  name: 'FamilyMember',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    first_name: {
      type: GraphQLString
    },
    last_name: {
      type: GraphQLString
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    familyMember: {
      type: FamilyMemberType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return FamilyMember.findById(args.id);
      }
    }
  }
});

const GetAllFamilyQuery = new GraphQLObjectType({
  name: 'GetAllFamily',
  fields: {
    familyMember: {
      type: FamilyMemberType,
      resolve(parent, args) {
        return FamilyMember.find();
      }
    }
  }
});

const AddFamilyMemberMutation = new GraphQLObjectType({
  name: 'AddFamilyMember',
  fields: {
    addFamilyMember: {
      type: FamilyMemberType,
      args: {
        first_name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        last_name: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parent, args) {
        let familyMember = new FamilyMember({
          first_name: args.first_name,
          last_name: args.last_name
        });
        return familyMember.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: [RootQuery, GetAllFamilyQuery],
  mutation: AddFamilyMemberMutation
});
