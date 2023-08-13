'use client';

import { ProjectInterface, SessionInterface } from '@/common.types';
import { createNewProject, fetchToken, updateProject } from '@/lib/actions';

import Button from './Button';
import CustomMenu from './CustomMenu';
import FormField from './FormField';
import Image from 'next/image';
import { categoryFilters } from '@/constants';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
}

export default function ProjectForm({ type, session, project }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    image: project?.image ?? '',
    title: project?.title ?? '',
    description: project?.description ?? '',
    liveSiteUrl: project?.liveSiteUrl ?? '',
    githubUrl: project?.githubUrl ?? '',
    category: project?.category ?? '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { token } = await fetchToken();

    try {
      if (type === 'create') {
        await createNewProject(form, session?.user?.id, token);
        await fetch('/api/revalidate?path=/');
        router.push('/');
      }
      if (type === 'edit') {
        await updateProject(form, project?.id as string, token);
        await fetch('/api/revalidate?path=/');
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];

    if (!file) return;
    if (!file.type.includes('image')) return alert('Please upload an image file');

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange('image', result);
    };
  };
  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && 'Choose a poster for your project'}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === 'create'}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form.image}
            alt="project poster"
            fill
            className="sm:p-10 object-contain z-20"
          />
        )}
      </div>
      <FormField
        title="Title"
        state={form.title}
        placeholder="Dribbleusz"
        setState={(value) => handleStateChange('title', value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects"
        setState={(value) => handleStateChange('description', value)}
      />
      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://klaudiuszb.live"
        setState={(value) => handleStateChange('liveSiteUrl', value)}
      />
      <FormField
        type="url"
        title="Github URL"
        state={form.githubUrl}
        placeholder="https://github.com/KlaudiuszB5528"
        setState={(value) => handleStateChange('githubUrl', value)}
      />
      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange('category', value)}
      />
      <div className="flexStart w-full">
        <Button
          title={
            isSubmitting
              ? `${type === 'create' ? 'Creating' : 'Editing'}`
              : `${type === 'create' ? 'Create' : 'Edit'}`
          }
          type="submit"
          leftIcon={isSubmitting ? '' : '/plus.svg'}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
}
