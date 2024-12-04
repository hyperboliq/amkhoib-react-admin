// import React from 'react';
// import { MenuItem, Select } from '@mui/material';
// import {
//     Datagrid,
//     ArrayField,
//     TextField,
//     Button,
//     useNotify,
//     useRefresh,
//     useRecordContext,
//     ReferenceArrayInput,
//     choices,
// } from 'react-admin';
// import supabaseClient from '../supabaseClient';



// /**
//  * Select input for a many-to-many relationship where selecting a related resource
//  * adds the appropriate row in the intermediary table.
//  * @param {string} props.relationship Name of the (array) relationship in hasura
//  * @param {string} props.source Name of the source resource
//  * @param {string} props.relatedResource Name of the related resource in snake_case singular, e.g. actor
//  * @param {string} props.addRelationMut GQL mutation to add the relationship, which should receive
//  * the ID of the source resource as $resourceId and the ID of the related resource as $relatedResourceId
//  *
//  * Example:
//  *   <M2MRelatedResourceSelectInput
//  *       relationship="movie__actors"
//  *       resource="movie"
//  *       relatedResource="actor"
//  *       addRelationMut={addMovieActorMut}
//  *   />
//  */
// export const M2MRelatedResourceSelectInput = ({
//     relationship,
//     resource,
//     relatedResource,
//     addRelationMut,
//     ...rest
// }: any) => {
//     const record = useRecordContext();
//     const refresh = useRefresh();
//     const notify = useNotify();
//     const [addRelation, { loading }] = useMutation(addRelationMut, {
//         client: supabaseClient,
//         onCompleted: () => {
//             refresh();
//         },
//         onError: () => {
//             notify('Error adding relation.');
//         },
//     });

//     const RelatedSelect = ({ choices: [] }) => {
//         // don't show related resources already in this relationship
//         const filteredChoices = choices.filter(
//             relatedResource =>
//                 !relatedResource[relationship].some(
//                     relation => relation[resource].id === record.id
//                 )
//         );
//         const noneSelected = filteredChoices.length === choices.length;

//         return (
//             <Select
//                 onChange={event =>
//                     addRelation({
//                         variables: {
//                             resourceId: record.id,
//                             relatedResourceId: event.target.value,
//                         },
//                     })
//                 }
//                 value=""
//                 disabled={loading || filteredChoices.length === 0}
//                 style={{ width: '250px', margin: !noneSelected && '15px 0' }}
//             >
//                 {filteredChoices.map(choice => (
//                     <MenuItem value={choice.id} key={choice.id}>
//                         {`#${choice.id} ${choice.name}`}
//                     </MenuItem>
//                 ))}
//             </Select>
//         );
//     };

//     return (
//         <ReferenceArrayInput
//             {...rest}
//             source={relationship}
//             reference={`${relatedResource}s`}
//             format={relations =>
//                 relations.map(relation => relation[relatedResource].id)
//             }
//         >
//             <RelatedSelect />
//         </ReferenceArrayInput>
//     );
// };

// function useMutation(addRelationMut: any, arg1: { client: any; onCompleted: () => void; onError: () => void; }): [any, { loading: any; }] {
//     throw new Error('Function not implemented.');
// }
