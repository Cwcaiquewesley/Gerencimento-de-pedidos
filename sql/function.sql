CREATE OR REPLACE FUNCTION calcular_total_pedido(p_id INT)
RETURNS NUMERIC AS $$
DECLARE
    total NUMERIC;
BEGIN
    SELECT SUM(quantidade * valor_unitario)
    INTO total
    FROM itens_pedido
    WHERE id_pedido = p_id;

    RETURN COALESCE(total, 0);
END;
$$ LANGUAGE plpgsql;