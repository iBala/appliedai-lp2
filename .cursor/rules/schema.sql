   CREATE TABLE ai_company_tag_map (
     id BIGSERIAL PRIMARY KEY,
     company_id BIGINT REFERENCES ai_companies(id) ON DELETE CASCADE,
     tag_id BIGINT REFERENCES ai_company_tags(id) ON DELETE CASCADE,
     created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
     UNIQUE (company_id, tag_id)
   );

   