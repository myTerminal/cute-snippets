(defun nth-cyclic (index collection)
  (cond ((< index
            0) (nth-cyclic (+ index
                              (length collection))
            collection))
        ((> index
            (1- (length collection))) (nth-cyclic (- index
                                                     (length collection))
            collection))
        (t (nth index
                collection))))