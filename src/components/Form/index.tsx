import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { CreateProps } from "../../pages/Create";
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select/creatable";
import { Tag } from "../../types"
import { v4 } from "uuid";
import styles from "./form.module.css";

const CustomForm = ({
  availableTags,
  handleSubmit,
  createTag,
  markdown = "",
  title = "",
  tags = [],
}: CreateProps) => {
  const navigate = useNavigate();

  // state
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

  // form elemanlarının refaransını alma
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // form gönderilince çalışır
  const handleSend = (e: FormEvent) => {
    // sayfa yenilmeyi engelledik
    e.preventDefault();

    // yeni note'u state kaydetme
    handleSubmit({
      title: inputRef.current?.value as string,
      markdown: textareaRef.current?.value as string,
      tags: selectedTags,
    });

    // anasayfaya yönlendirme
    navigate("/");
  };

  return (
    <Form onSubmit={handleSend} className="mt-4">
      <Stack>
        {/* Başlık - Etiket Input */}
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Başlık</Form.Label>
              <Form.Control defaultValue={title} ref={inputRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Etiketler</Form.Label>
              <ReactSelect
                onChange={(allTags) => setSelectedTags(allTags as Tag[])}
                onCreateOption={(text: string) => {
                  // etiket nesnesi oluşturma ve id ekleme
                  const newTag: Tag = { label: text, value: v4() };

                  // yeni etiketi locale kaydetme
                  createTag(newTag);

                  // seçili etiketler state'ine ekleme
                  setSelectedTags([...selectedTags, newTag]);
                }}
                value={selectedTags}
                options={availableTags}
                isMulti
                className="text-black"
              />
            </Form.Group>
          </Col>
        </Row>

        {/* İçerik */}
        <Form.Group controlId="markdown" className="mt-4">
          <Form.Label>İçeirk (markdown destekler)</Form.Label>
          <Form.Control
            defaultValue={markdown}
            ref={textareaRef}
            as="textarea"
            style={{ minHeight: "300px", maxHeight: "500px" }}
          />
        </Form.Group>

        {/* Buttons */}
        <Stack
          gap={4}
          direction="horizontal"
          className="justify-content-end mt-5"
        >
          <Button type="submit">Kaydet</Button>
          <Button type="button" variant="secondary">
            Geri
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default CustomForm;