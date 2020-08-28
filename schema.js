var graphql = require('graphql');
var mongoose = require('mongoose');

const { Device, FamilyMember } = require('./models');

const {
  GraphQLFloat,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLNonNull
} = graphql;

const DeviceType = new GraphQLObjectType({
  name: 'DeviceType',
  fields: () => ({
    _id: {
      type: GraphQLID
    },
    device_type: {
      type: GraphQLString
    },
    threats: {
      type: GraphQLList(ThreatType)
    }
  })
});

const DeviceInput = new GraphQLInputObjectType({
  name: 'DeviceInput',
  fields: () => ({
    device_type: {
      type: GraphQLString
    }
  })
});

const FamilyMemberType = new GraphQLObjectType({
  name: 'FamilyMember',
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    first_name: {
      type: GraphQLString
    },
    last_name: {
      type: GraphQLString
    },
    devices: {
      type: GraphQLList(DeviceType)
    }
  })
});

const LocationType = new GraphQLObjectType({
  name: 'Location',
  fields: () => ({
    lat: {
      type: GraphQLFloat
    },
    long: {
      type: GraphQLFloat
    }
  })
});

const ThreatType = new GraphQLObjectType({
  name: 'Threat',
  fields: () => ({
    _id: {
      type: GraphQLID
    },
    threat_type: {
      type: GraphQLString
    },
    threat_description: {
      type: GraphQLString
    },
    threat_location: {
      type: LocationType
    },
    threat_category: {
      type: GraphQLString
    }
  })
});

const rootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getOneFamilyMember: {
      type: FamilyMemberType,
      args: {
        _id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return FamilyMember.findById(args.gqlid);
      }
    },
    getAllFamilyMembers: {
      type: new GraphQLList(FamilyMemberType),
      resolve(){
        return FamilyMember.find();
      }
    }
  }
});

const rootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addFamilyMember: {
      type: FamilyMemberType,
      args: {
        first_name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        last_name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        devices: {
          type: DeviceInput
        }
      },
      resolve(parent, args) {
        console.log('inside resolve', args);
        let familyMember = new FamilyMember({
          first_name: args.first_name,
          last_name: args.last_name,
          devices: args.devices
        });
        return familyMember.save();
      }
    },
    deleteFamilyMember: {
      type: FamilyMemberType,
      args: {
        _id: {
          type: GraphQLID
        }
      },
      resolve(parent, args){
        return FamilyMember.deleteOne({_id: args._id});
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: rootQueryType,
  mutation: rootMutationType
});
