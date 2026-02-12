CREATE OR REPLACE FUNCTION trg_desativar_produto_sem_estoque()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.quantidade <= 0 THEN
    NEW.status := FALSE;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS t_desativar_produto_sem_estoque ON Produto;

CREATE TRIGGER t_desativar_produto_sem_estoque
BEFORE INSERT OR UPDATE ON Produto
FOR EACH ROW
EXECUTE FUNCTION trg_desativar_produto_sem_estoque();
