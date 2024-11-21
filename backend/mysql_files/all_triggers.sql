USE dueit;

DELIMITER $$

CREATE TRIGGER increment_student_count
AFTER INSERT ON student_class
FOR EACH ROW
BEGIN
    UPDATE classes
    SET num_st = num_st + 1
    WHERE class_ID = NEW.class_ID;
END$$

DELIMITER ;

DELIMITER //

CREATE PROCEDURE AddClass(
    IN p_class_ID VARCHAR(50),
    IN p_section INT,
    IN p_classroom VARCHAR(10),
    IN p_batch VARCHAR(10),
    IN p_coursecode VARCHAR(10),
    IN p_user_ID VARCHAR(50)
)
BEGIN
    -- Check if the coursecode exists
    IF NOT EXISTS (SELECT 1 FROM courses WHERE coursecode = p_coursecode) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Course code does not exist.';
    ELSE
        -- Check if the class_ID already exists
        IF EXISTS (SELECT 1 FROM classes WHERE class_ID = p_class_ID) THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Class ID already exists.';
        ELSE
            -- Insert the new class
            INSERT INTO classes (class_ID, section, classroom, batch, coursecode, user_ID)
            VALUES (p_class_ID, p_section, p_classroom, p_batch, p_coursecode, p_user_ID);
        END IF;
    END IF;
END //

DELIMITER ;
