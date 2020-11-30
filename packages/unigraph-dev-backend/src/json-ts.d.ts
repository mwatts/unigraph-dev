type UidType<uid extends string> = {"uid": uid}
type UnigraphIdType<uid extends string> = {"unigraph.id": uid}
type RefUnigraphIdType<uid extends string> = {"$ref": {"key": "unigraph.id", "query": uid}}

declare function uid<IdType extends string>(id: IdType): UidType<IdType>
declare function makeUnigraphId<IdType extends string>(id: IdType): UnigraphIdType<IdType>
declare function makeRefUnigraphId<IdType extends string>(id: IdType): RefUnigraphIdType<IdType>

type ComposerObjectIndexs = "$/primitive/string"

type PrimitiveType = {
    "$/primitive/string": string
}

// We say this is a Field "indexed by" T
type Field<T extends ComposerObjectIndexs> = {
    key: PrimitiveType[T],
    definition: Definition
}

type ComposerObjectInstance<T extends ComposerObjectIndexs> = {
    type: RefUnigraphIdType<"$/composer/Object">,
    parameters?: {
        indexedBy: RefUnigraphIdType<T>,
        indexes: PrimitiveType[T][]
    },
    properties: Field<T>[]
}

type ComposerArrayInstance = {
    type: RefUnigraphIdType<"$/composer/Array">,
    parameters: {
        element: Definition
    }
}

type Composers = ComposerObjectInstance<ComposerObjectIndexs> | ComposerArrayInstance
type PrimitiveTypes = RefUnigraphIdType<"$/primitive/string"> | RefUnigraphIdType<"$/primitive/number"> | RefUnigraphIdType<"$/primitive/boolean">
type Primitive = {"type": PrimitiveTypes}

export type Schema = {
    "unigraph.id": string,
    definition: Definition
}

export type SchemaDgraph = Schema | {"dgraph.type": "Type"}

interface SchemaRef<T extends string> {
    type: RefUnigraphIdType<`$/schema/${T}`>
}

type Types = Composers | Primitive | Schema | SchemaRef<string>

export type Definition = Types

export type Entity<T extends string> = {
    "uid"?: string,
    type?: RefUnigraphIdType<`$/schema/${T}`>,
    "_value": any
}

export type EntityDgraph<T extends string> = Entity<T> | {"dgraph.type": "Entity"}