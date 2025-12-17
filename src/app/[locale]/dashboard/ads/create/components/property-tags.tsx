'use client';
import {
    Tags,
    TagsContent,
    TagsEmpty,
    TagsGroup,
    TagsInput,
    TagsItem,
    TagsList,
    TagsTrigger,
    TagsValue,
} from '@/components/ui/shadcn-io/tags';
import { CheckIcon, PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PropertyTagInput } from '../hooks/use-create-properrty-schema';





interface Props {
    placeholder?: string;
    defaultTags?: PropertyTagInput[];
    onChange?: (tags: PropertyTagInput[]) => void;
    value?: PropertyTagInput[];
    enableCreate?: boolean
}


const PropertyTags: React.FC<Props> = ({ placeholder, defaultTags = [], onChange, value, enableCreate = true }) => {



    const [selected, setSelected] = useState<PropertyTagInput[]>(value ?? []);
    const [newTag, setNewTag] = useState<string>('');
    const [tags, setTags] = useState<PropertyTagInput[]>(defaultTags);

    useEffect(() => {
        setTags(defaultTags);
    }, [defaultTags])

    const handleRemove = (value: string) => {

        setSelected((prev) => prev.filter((v) => v.name !== value));
    };
    const handleSelect = (value: string) => {

        if (selected.find((tag: PropertyTagInput) => tag.name == value)) {
            handleRemove(value);
            return;
        }
        const selectedTag: PropertyTagInput | undefined = tags.find((tag: PropertyTagInput) => tag.name == value);

        setSelected((prev) => [...prev, selectedTag as PropertyTagInput]);
    };
    const handleCreateTag = () => { 

        if (newTag.trim().length == 0)
            return;

        setTags((prev) => [
            ...prev,
            {

                name: newTag,
            },
        ]);
        setSelected((prev) => [...prev, { name: newTag } as PropertyTagInput]);
        setNewTag('');
    };

    useEffect(() => {
        onChange && onChange(selected);
    }, [selected]);


    return (
        <Tags className="w-full">
            <TagsTrigger placeholder={placeholder}>
                {selected.map((tag) => (
                    <TagsValue key={tag.name} onRemove={() => handleRemove(tag.name as string)}>
                        {tags.find((t) => t.name === tag.name)?.name}
                    </TagsValue>
                ))}
            </TagsTrigger>
            <TagsContent>
                <TagsInput onValueChange={setNewTag} placeholder={placeholder ?? "Select Tag"} />
                <TagsList>
                    <TagsEmpty>
                        <button
                            className="mx-auto flex cursor-pointer items-center gap-2"
                            onClick={enableCreate ? handleCreateTag : undefined}
                            type="button"
                        >
                            {enableCreate ? (
                                <>

                                    <PlusIcon className="text-muted-foreground" size={14} />
                                    Create new tag: {newTag}
                                </>
                            ) :
                                <>
                                    No Tag found: {newTag}

                                </>

                            }
                        </button>
                    </TagsEmpty>
                    <TagsGroup>
                        {tags.map((tag, index) => (
                            <TagsItem key={index} onSelect={handleSelect} value={tag.name}>
                                {tag.name}
                                {selected.find((selectedTag: PropertyTagInput) => selectedTag.name == tag.name) && (
                                    <CheckIcon className="text-muted-foreground" size={14} />
                                )}
                            </TagsItem>
                        ))}
                    </TagsGroup>
                </TagsList>
            </TagsContent>
        </Tags>
    );
};
export default PropertyTags;
